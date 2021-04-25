import { UserModule } from '~/types'
import ElementPlus from 'element-plus';
export const install: UserModule = ({ isClient, router,app }) => {

console.log('dgdfg');    app.use(ElementPlus);  
   
}
