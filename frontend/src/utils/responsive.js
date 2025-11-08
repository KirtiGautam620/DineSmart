import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const wd=(percent)=> (width*percent)/100;
export const hd=(percent)=>(height*percent)/100;