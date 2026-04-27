export interface Project {
  name: string;
  description: string;
  html_url: string;
  live_url: string;
  previewUrl: string;
  readme: string;
  languages: string[];
}

export interface ProjectType{
    id:number;
    title:string;
    icon?:string;
}



export interface PortfolioProject {
  title: string;
  description: string;
  imgurl: string;
  github: string;
  liveurl: string;
  tags: ProjectType[]; // Objektumokat tartalmaz!
}


export interface RawPortfolioProject {
  title: string;
  description: string;
  imgurl: string;
  github: string;
  liveurl: string;
  tags: number[]; // Csak ID-kat tartalmaz!
}