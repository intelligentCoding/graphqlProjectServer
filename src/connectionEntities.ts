import path from 'path'
import { Fruits } from './entities/Fruits'
import { Roles } from './entities/Roles'
import { User } from './entities/User'
import { UserFruits } from './entities/UserFruits'

export const connectionEntities = [
  path.join(__dirname, './entities/*'),
  Roles,
  User,
  UserFruits,
  Fruits,
]
