
import { prop, required, maxLength } from '@rxweb/reactive-form-validators';

export class SrnModel {
    @prop({ defaultValue: '' })
    umid: string;

    @required()
    fullName: string;

    @prop({ defaultValue: 0 })
    q111: number;

    @prop({ defaultValue: 0 })
    q112: number;

    @prop({ defaultValue: 0 })
    q113: number;

    @prop({ defaultValue: 0 })
    q121: number;

    @prop({ defaultValue: 0 })
    q122: number;

    @prop({ defaultValue: 0 })
    q123: number;

    @prop({ defaultValue: 0 })
    q131: number;

    @prop({ defaultValue: 0 })
    q132: number;

    @prop({ defaultValue: 0 })
    q133: number;

    @prop({ defaultValue: 0 })
    q141: number;

    @prop({ defaultValue: 0 })
    q211: number;

    @prop({ defaultValue: 0 })
    q212: number;

    @prop({ defaultValue: 0 })
    q213: number;

    @prop({ defaultValue: 0 })
    q221: number;

    @prop({ defaultValue: 0 })
    q222: number;

    @prop({ defaultValue: 0 })
    q223: number;

    @prop({ defaultValue: '' })
    q31: string;

    @prop({ defaultValue: 0 })
    q321: number;

    @prop({ defaultValue: 0 })
    q322: number;

    @prop({ defaultValue: 0 })
    q323: number;

    @prop({ defaultValue: 0 })
    q324: number;

    @prop({ defaultValue: '' })
    q41: string;

    @prop({ defaultValue: '' })
    q42: string;

    @prop({ defaultValue: '' })
    q43: string;

    @prop({ defaultValue: '' })
    q44: string;

    @prop({ defaultValue: 0 })
    q51: number;

    @prop({ defaultValue: 0 })
    q52: number;

    @prop({ defaultValue: 0 })
    q53: number;

    @prop({ defaultValue: 0 })
    q54: number;

    @prop({ defaultValue: 0 })
    q55: number;

    @prop({ defaultValue: '' })
    q56: number;

    @required()
    surveyAt: Date;

    @prop({ defaultValue: '' })
    comment: string;
}

