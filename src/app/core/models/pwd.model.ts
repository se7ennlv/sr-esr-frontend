import { required, compare, minLength } from "@rxweb/reactive-form-validators"

export class PasswordModel {

    @required()
    @minLength({ value: 6 })
    username: number;

    @required()
    @minLength({ value: 6 })
    newPassword: string;

    @required()
    @compare({ fieldName: 'newPassword' })
    cfNewPassword: string;
}