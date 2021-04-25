import { Ref, ref } from "vue";
import NProgress from 'nprogress'

export function useAsync<TFunc extends Function>(func:TFunc):[Ref<any>,Ref<boolean>,TFunc,Ref<any>]{
    const isLoading = ref(false);
    const result = ref(null);
    const error = ref(null);
    const execute=(...args:any[])=>{
        isLoading.value=true;
        NProgress.start()
        const promisedValue=func(...args);
        Promise.resolve(promisedValue).then(r=>{
            result.value = r;

        },rejectReason=>error.value=rejectReason)
        .finally(()=>{
    NProgress.done()
         
            isLoading.value=false
        });
        return promisedValue;
    }
    return [result,isLoading,execute as any,error];
} 