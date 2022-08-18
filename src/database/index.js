import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Student from '../models/Student';
import User from '../models/User';
import Photo from '../models/Photo';

const models = [Student, User, Photo];
const dbConnection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(dbConnection));
models.forEach((model) => model.associate && model.associate(dbConnection.models));
