import { Card, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { registerUser } from "@/lib/authenticate";


export default function Register(props){

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2,setPassword2] =useState("");

  const [warning, setWarning] = useState('');
//   const [setFavouritesList] = useAtom(favouritesAtom);
//   const [setSearchHistory] = useAtom(searchHistoryAtom); 

//   async function updateAtoms(){
//     setFavouritesList(await getFavourites());
//     setSearchHistory(await getHistory());
//     }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password,password2);
    //   await updateAtoms();
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }

    
}
  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account: </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm password</Form.Label><Form.Control type="password" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
        </Form.Group>
        <br />

        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
  );
}