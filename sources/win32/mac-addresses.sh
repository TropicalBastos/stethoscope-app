#!/usr/bin/env kmd
exec ipconfig /all
trim
split \n\n
  save line
  debug
  extract \s([0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2})
  save addr

  load line
  extract Description.+: (.*)
  save device

  echo null
  save physical_adapter

  remove line
noEmpty
save macAddresses
