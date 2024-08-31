export function generateUniqueId() {
    
    const timestamp = Date.now(); 
  
   
    const random = Math.floor(1000 + Math.random() * 9000);
  
    
    const uniqueId = `${timestamp}${random}`;
  
    return uniqueId;
  }
  