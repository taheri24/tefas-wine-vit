import { UserModule } from '~/types'
import ElementPlus from 'element-plus';

export const install: UserModule = ({ isClient, router,app }) => {

    app.use(ElementPlus);  
   
}
