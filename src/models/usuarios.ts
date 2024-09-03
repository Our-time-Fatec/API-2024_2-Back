import mongoose, { Schema } from "mongoose";

const UsuarioSchema = new Schema({
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
            message: (props:any) => `${props.value} não é um formato de e-mail válido`,
    }
},
    senha: {
        type: String, 
        minlength: 6, 
        maxlength: 100, 
        select: false,
        trim: true,
        required: [true, "A senha é obrigatória"]
    },
    dataDeNascimento:{
        type: Date,
        required: [true, "Preencha sua idade"]
    },
    peso:{
        type: Number,
        required: [true, "Preencha seu peso"]
    },
    altura:{
        type: Number,
        required: [true, "Preencha sua altura"]
    },
    nivelDeSedentarismo:{
        type: String,
        enum: ["Sedentário", "Levemente ativo", "Moderadamente ativo", "Altamente ativo", "Extremamente ativo"],
        default: "Moderadamente ativo"
    },
    sexo:{
        type: String,
        enum: ["Masculino", "Feminino"],
        default: "Masculino"
    },
    IMC:{
        type: Number
    },
    taxaMetabolismoBasal:{
        type: Number
    },
    ultimaVezUtilizado:{
        type: Date,
        default: Date.now
    },
    criadoEm:{
        type: Date,
        default: Date.now
    },
    atualizadoEm:{
        type: Date,
        default: null
    },
    removidoEm:{
        type: Date,
        default: null
    }
}, {
    toJSON: {
        transform: function(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

UsuarioSchema.pre('save', function(next) {
    this.ultimaVezUtilizado = new Date();
    next();
})

const UsuarioModel = mongoose.model("Usuario", UsuarioSchema, "users")

export default UsuarioModel