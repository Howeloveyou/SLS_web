
export function FormatNumber(srcStr,nAfterDot){
  var resultStr,nTen;
  srcStr = ""+srcStr+"";
  let strLen = srcStr.length;
  let dotPos = srcStr.indexOf(".",0);
  if (dotPos == -1){
    resultStr = srcStr+".";
    for (let i=0;i<nAfterDot;i++){
      resultStr = resultStr+"0";
    }
    return resultStr;
  } else{
    if ((strLen - dotPos - 1) >= nAfterDot){
      let nAfter = dotPos + nAfterDot + 1;
      nTen =1;
      for(let j=0;j<nAfterDot;j++){
        nTen = nTen*10;
      }
      resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
      return resultStr;
    } else{
      resultStr = srcStr;
      for (let i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
        resultStr = resultStr+"0";
      }
      return resultStr;
    }
  }
}

export function FormatBinary(srcStr,nAfterDot){
  let resultStr
  resultStr = srcStr
  for (let i=0;i<nAfterDot - srcStr.length;i++){
    resultStr = "0" + resultStr
  }
  return resultStr
}
