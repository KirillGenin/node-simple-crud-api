import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.PORT);
process.env.NODE_MODE === 'balancer'
  ? console.log('Мульти режим с кластерами')
  : console.log('Моно режим');
