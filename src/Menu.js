const { Menu, shell, ipcMain, BrowserWindow } = require('electron')
const pkg = require('../package.json')
const config = require('./config.json')
const AutoLauncher = require('./AutoLauncher')

const toggleAutoLaunchMenus = (autoLaunchOn) => {
  let autoLaunchMenuOptions = Menu.getApplicationMenu().getMenuItemById('autolaunch').submenu
  autoLaunchMenuOptions.getMenuItemById('autolaunchOn').checked = autoLaunchOn
  autoLaunchMenuOptions.getMenuItemById('autolaunchOff').checked = !autoLaunchOn
}

const showChangeScanProfile = () => {
  let window = BrowserWindow.getAllWindows()[0];
  window.webContents.send('toggle:changeprofile', true);
}

module.exports = function (mainWindow, app, focusOrCreateWindow, updater, log) {
  const { checkForUpdates } = updater
  const autoLauncher = new AutoLauncher()
  const isAutoLauncherEnabled = autoLauncher.isEnabled()

  const contextMenu = [
    { role: 'copy', accelerator: 'CmdOrCtrl+C' },
    {
      label: 'Window',
      submenu: [
        { role: 'reload' },
        { role: 'close', accelerator: 'CmdOrCtrl+W' },
        {
          label: 'Open Window',
          accelerator: 'CmdOrCtrl+N',
          click () {
            focusOrCreateWindow()
          }
        }
      ]
    },
    {
      label: 'Options',
      submenu: [
        {
          label: 'Change Scan Profile',
          click () {
            showChangeScanProfile()
          }
        }
      ]
    },
    {
      id: 'autolaunch',
      label: 'Launch on Startup',
      submenu: [
        {
          id: 'autolaunchOn',
          label: 'On',
          type: 'checkbox',
          checked: isAutoLauncherEnabled,
          click (event) {
            toggleAutoLaunchMenus(true)
            autoLauncher.enable()
          }
        },
        {
          id: 'autolaunchOff',
          label: 'Off',
          type: 'checkbox',
          checked: !isAutoLauncherEnabled,
          click (event) {
            toggleAutoLaunchMenus(false)
            autoLauncher.disable()
          }
        }
      ]
    },
    {
      label: 'Check for Update',
      click (event) {
        checkForUpdates(this, mainWindow, event)
      }
    },
    { role: 'separator', enabled: false }
  ].concat({
    label: 'Help',
    submenu: config.menu.help.map(({ label, link }) => ({
      label,
      click () {
        shell.openExternal(link)
      }
    })).concat({
      label: `Stethoscope version ${pkg.version}`,
      enabled: false
    })
  },
  { role: 'separator', enabled: false }
  )

  if (process.env.NODE_ENV === 'development') {
    contextMenu.push({ role: 'toggleDevTools', accelerator: 'Alt+CmdOrCtrl+I' })
  }

  contextMenu.push({ role: 'quit', accelerator: 'CmdOrCtrl+Q' })

  const applicationMenu = Menu.buildFromTemplate([{
    label: app.getName(),
    submenu: [{
      label: `Stethoscope version ${pkg.version}`,
      enabled: false
    },
    {
      label: 'Check for Update',
      click (event) {
        checkForUpdates(this, mainWindow, event)
      }
    },
    { role: 'copy', accelerator: 'CmdOrCtrl+C' },
    { role: 'quit', accelerator: 'CmdOrCtrl+Q' }
    ]
  }].concat(contextMenu))

  // Left side main menu
  Menu.setApplicationMenu(applicationMenu)

  // Rigth click menu
  const contextMenuInstance = Menu.buildFromTemplate(contextMenu)
  return contextMenuInstance
}
