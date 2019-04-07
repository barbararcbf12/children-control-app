//Fetching data from Famly's API and checking if resultant JSON's 

  var accessToken = '234ffdb8-0889-4be3-b096-97ab1679752c';
  var groupId = '11fc220c-ebba-4e55-9346-cd1eed714620';
  var institutionId = 'fb6c8114-387e-4051-8cf7-4e388a77b673';
  
  export const fetchChildrenGroup = () => {
  
    // var FAMLY_API_GETENDPOINT = 'https://tryfamly.co/api/daycare/tablet/group?accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673'
      var FAMLY_API_GETENDPOINT = `https://tryfamly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`;
    
      return fetch(FAMLY_API_GETENDPOINT)
      .then(response => {
          return response.json();
        }).then(json => { 
          console.log("json: " + json.children[0].childId);
          // return json;
            return json.children.map(({ childId, name, birthday, image, checkinTime, pickupTime, checkins }) =>
              ({
                childId,
                name,
                birthday,
                image,
                checkinTime,
                pickupTime,
                checkins
              })
            );
          })
  };


  export const checkInChild = ( child, pickupTime ) => {

    console.log("API child", child);
    console.log("API pickupTime", pickupTime);

    var FAMLY_API_POSTCHECKIN = `https://tryfamly.co/api/v2/children/${child.childId}/checkins`; 
  
    return fetch( FAMLY_API_POSTCHECKIN, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded, multipart/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: accessToken,
        pickupTime: pickupTime 
      })
    })
    .then(response => {
        console.log('response: ', response)        
      if (response.ok) {
          return response.json();
        } else {
           throw new Error('Something went wrong ...');
        }
      })
  
  };
  

  export const checkOutChild = ( child ) => {

    console.log("API OUT child", child);

    var FAMLY_API_POSTCHECKOUT = `https://tryfamly.co/api/v2/children/${child.childId}/checkout`; 
  
    return fetch( FAMLY_API_POSTCHECKOUT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded, multipart/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: accessToken
      })
    })
    .then(response => {
        console.log('response: ', response)        
      if (response.ok) {
          return response.json();
        } else {
           throw new Error('Something went wrong ...');
        }
      })
  // return (response.status === 201);
  };

