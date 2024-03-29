import {Schema, model, models} from 'mongoose'

const userSchema: any = new Schema({
    full_name: {type: String, required: true},
    password: {type: String, required: true},
    hire_date: String,
    email: String,
    job: String
})

const users = models.users || model('users', userSchema)
export default users