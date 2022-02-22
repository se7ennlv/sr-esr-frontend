import { required, numeric, NumericValueType, minLength, maxLength, prop } from "@rxweb/reactive-form-validators"

export class AccountModel {

    @required()
    @minLength({ value: 6 })
    @maxLength({ value: 6 })
    @numeric({ acceptValue: NumericValueType.Both })
    username: string;

    @prop({defaultValue: ''})
    @required()
    @minLength({ value: 6 })
    password: string;
}