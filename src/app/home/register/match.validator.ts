import { ValidatorFn, FormGroup } from '@angular/forms';

export const UserNamePasswordMatcher: ValidatorFn = (fg: FormGroup) => {

    const userName = fg.get('userName').value;
    const password = fg.get('password').value;

    if (userName.trim() + password.trim()) {
        if (userName != password) {
            return null;
        }

        return { UserNamePasswordMatcher: true };
    }

};