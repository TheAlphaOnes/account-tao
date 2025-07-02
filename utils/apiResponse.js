const apiResponse = (data, status, msg) => {

  return {
    "status":status,
    "data": data,
    "msg": msg,
  };

}


export {apiResponse};
