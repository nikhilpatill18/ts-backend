interface previousExperience{
    company:string;
    role:string;
    year:number
}

interface UserDetails{
  id?:string;
  user_id?:string;
  underGraduation:string;
  underGraduationYear:string;
  postGraduation?:string;
  postGraduationYear?:string;
  resume:string;
  previousExperiece:previousExperience[];
  state:string;
  city:string;
  skills:string[];
  isStudying:boolean;
}

interface userData {
  id?: string;
  firstName: string;
  lastname: string;
  fullName?:string;
  email: string;
  password?: string|undefined;
  isVerified:boolean;
  isProfileCompleted:boolean;
  user_details?:UserDetails
  createdAt?: Date;
  updatedAt?: Date;
}



export type {userData,UserDetails}