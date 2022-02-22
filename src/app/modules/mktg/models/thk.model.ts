import { prop, required } from '@rxweb/reactive-form-validators';

export class ThkModel {
    @prop({ defaultValue: '' })
    umid: string;

    @required()
    fullName: string;

    @prop({ defaultValue: 0 })
    q11: number;

    @prop({ defaultValue: 0 })
    q211: number;

    @prop({ defaultValue: 0 })
    q212: number;

    @prop({ defaultValue: 0 })
    q213: number;

    @prop({ defaultValue: 0 })
    q214: number;

    @prop({ defaultValue: 0 })
    q221: number;

    @prop({ defaultValue: 0 })
    q222: number;

    @prop({ defaultValue: 0 })
    q223: number;

    @prop({ defaultValue: 0 })
    q224: number;

    @prop({ defaultValue: 0 })
    q225: number;

    @prop({ defaultValue: 0 })
    q311: number;

    @prop({ defaultValue: 0 })
    q312: number;

    @prop({ defaultValue: 0 })
    q313: number;

    @prop({ defaultValue: 0 })
    q321: number;

    @prop({ defaultValue: 0 })
    q322: number;

    @prop({ defaultValue: '' })
    q41: string;

    @prop({ defaultValue: 0 })
    q42: number;

    @prop({ defaultValue: '' })
    q43: string;

    @prop({ defaultValue: '' })
    q44: string;

    @prop({ defaultValue: '' })
    q45: string;

    @required()
    surveyAt: Date;

    @prop({ defaultValue: '' })
    comment: string;
}