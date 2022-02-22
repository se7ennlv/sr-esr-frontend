import { prop, required, propObject, image, extension, numeric, NumericValueType } from '@rxweb/reactive-form-validators';

export class PlayerModel {
    @prop({ defaultValue: '' })
    umid: String;

    @required()
    firstName: string;

    @prop({ defaultValue: '' })
    lastName: string;


    @required()
    orgId: string;

    @required()
    levelId: string;

    @prop({ defaultValue: 0 })
    @numeric({ allowDecimal: true, isFormat: true })
    rolling: number;

    @prop({ defaultValue: 0 })
    @numeric({ allowDecimal: true, isFormat: true })
    winLoss: number;

    @required()
    gender: string;

    @prop({ defaultValue: '' })
    tel: string;

    @prop({ defaultValue: '' })
    address: string;

    @required()
    relationship: string;

    @required()
    isActive: boolean;

    @prop({ defaultValue: 'mktg/images/players' })
    extPath: string;

    @image()
    //@extension({ extensions: 'png', 'jpg'})
    file: string;
}