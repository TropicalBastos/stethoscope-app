const STETHOSCOPE_POLICY = 'STETHOSCOPE_POLICY';

class CustomPolicy{

    constructor(){
        let policy = localStorage.getItem(STETHOSCOPE_POLICY);
        if(policy) {
            this.policy = JSON.parse(policy);
        }
    }

    getPolicy() {
        return this.policy;
    }

    setPolicy(policy) {
        localStorage.setItem(STETHOSCOPE_POLICY, JSON.stringify(policy));
    }

    hasCustomPolicy() {
        return this.policy ? true : false;
    }

    deletePolicy() {
        localStorage.removeItem(STETHOSCOPE_POLICY);
    }

}

export default CustomPolicy;