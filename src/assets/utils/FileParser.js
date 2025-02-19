// Cod so promise vo koj ke kazeme deka nasata slika dobiena kako objekt ke ja pretvorime vo string.

export const FileParser = (file)=>{
   return new Promise((resolve,reject)=>{
    let fileRider = new FileReader();
    fileRider.readAsDataURL(file);
    fileRider.onload=()=>resolve(fileRider.result);
    fileRider.onerror = (error) => reject(error);
    
   })
}