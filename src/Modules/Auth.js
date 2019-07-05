class Auth {
  AuthLogin = async (email, password) => {
    
    let dataLogin = {
      email: email,
      password: password
    };

    const loginPost = await fetch('/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataLogin),
    })

    console.log(loginPost);
    
    if(loginPost.status !== 201 || !loginPost.ok) 
      throw Error("Błąd logowania")

    const loginRes = await loginPost.json()
    localStorage.setItem('tokenLogin', loginRes.token)
  }

  JTWValidator = async () => {
    let getJTW = localStorage.getItem('tokenLogin');
    
    let JWTData = {
      jwt: getJTW
    };

    try {
      const checkValidOfJWT = await fetch('/auth/jwt', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JWTData)
      });

      return checkValidOfJWT.ok; 

    } catch(e) {
      console.error(e);
      return false;
    }
  }
}

export default new Auth()