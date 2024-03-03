import { PrismaClient } from '@prisma/client'


let prisma = new PrismaClient({       
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@postgres-container:5432/profile-db',
    },
  },      
});
if(process.env.NODE_ENV === 'production'){
  prisma= new PrismaClient()
}else{
  if(!global.prisma){
    global.prisma=new PrismaClient();
  }
  prisma = global.prisma
}

export default prisma;
