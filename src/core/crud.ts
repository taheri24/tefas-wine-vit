import { AxiosInstance } from "axios";

export class CrudAPI<TEntity=any>{
 /**
  *
  */
 constructor(protected io:AxiosInstance,public masterPath:string) {
      
   this.createEntity=this.createEntity.bind(this);
   this.updateEntity=this.createEntity.bind(this);
   this.deleteEntity=this.createEntity.bind(this);
   this.findOne=this.findOne.bind(this);
   this.searchByCriteria=this.searchByCriteria.bind(this);

 }
 createEntity(entity:TEntity){
   return this.io.post(`${this.masterPath}`,entity);
 }
 getKey(entity:TEntity| number | string){
    if (!entity || typeof entity != "object") return entity;
 return (entity as any).id;
 }
 updateEntity(entity:TEntity ){
    const key =this.getKey(entity);
    return this.io.put(`${this.masterPath}/${key}`,entity);
 
}
 deleteEntity(entity:TEntity | number | string){
   const key =this.getKey(entity);
   return this.io.delete(`${this.masterPath}/${key}`);

 }
 searchByCriteria(criteria:any){
   return this.io.get(`${this.masterPath}`,{params:criteria});
 }
 countByCriteria(criteria:any){
   return this.io.get(`${this.masterPath}/count`,{params:criteria});
 }
 findOne(key:string| number){
   return this.io.get(`${this.masterPath}/${key}`);
 }


}