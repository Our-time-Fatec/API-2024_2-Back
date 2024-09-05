import mongoose, { Schema } from "mongoose";
import { IUsuario } from "../Interfaces/IUsuario";

const UsuarioSchema = new Schema<IUsuario>({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"],
    },
    sobrenome: {
        type: String,
        required: [true, "Sobrenome é obrigatório"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: {
            validator: function (value: string) {
                // expressão regular para validar o formato do e-mail
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: (props: any) => `${props.value} não é um formato de e-mail válido`,
        }
    },
    senha: {
        type: String,
        select: false,
        trim: true,
        required: [true, "A senha é obrigatória"]
    },
    dataDeNascimento: {
        type: Date,
        required: [true, "Preencha sua idade"]
    },
    peso: {
        type: Number,
        required: [true, "Preencha seu peso"]
    },
    altura: {
        type: Number,
        required: [true, "Preencha sua altura"]
    },
    nivelDeSedentarismo: {
        type: String,
        enum: ["Sedentário", "Levemente ativo", "Moderadamente ativo", "Altamente ativo", "Extremamente ativo"]
    },
    sexo: {
        type: String,
        enum: ["Masculino", "Feminino"]
    },
    objetivo: {
        type: String,
        enum: ["Dieta de emagrecimento", "Dieta de Ganho de Massa Muscular", "Dieta Low Carb"]
    },
    IMC: {
        type: Number
    },
    taxaMetabolismoBasal: {
        type: Number
    },
    caloriasGastas: {
        type: Number
    },
    ultimaVezUtilizado: {
        type: Date,
        default: Date.now
    },
    criadoEm: {
        type: Date,
        default: Date.now
    },
    atualizadoEm: {
        type: Date,
        default: null
    },
    removidoEm: {
        type: Date,
        default: null
    }
}, {
    toJSON: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

UsuarioSchema.pre('save', function (next) {
    this.ultimaVezUtilizado = new Date();
    next();
})

const UsuarioModel = mongoose.model<IUsuario>("Usuario", UsuarioSchema, "Usuarios")

export default UsuarioModel