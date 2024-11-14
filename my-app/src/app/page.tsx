'use client'
import { Button,Container,Text,useCheckbox,Drawer,Toggle} from "kitchn";
import React from "react";
import { hasCookie, setCookie } from 'cookies-next';
/* 
  tout l'element en une page client s'affiche pas si il n'y a pas de cookies a ce nom;
*/
export default function App() {
  const [checked, toggle] = useCheckbox();
  const [checked1, toggle1] = useCheckbox();
  const [checked2, toggle2] = useCheckbox();
  const [active, setActive] = React.useState(false);
  const [cookiescheck, setCookiescheck] = React.useState(null);
  const listCookie = []
  const cookieChoice = [
    "commercial",
    "personnel",
    "marketing"
  ];
  
  //object contenant tout les use status
  const command = [
    {bool:checked,toggle:toggle},
    {bool:checked1,toggle:toggle1},
    {bool:checked2,toggle:toggle2},
  ]

  //creation des option du cache 
  cookieChoice.forEach((element,index)=>{
    const ContainerName = element + 'container';
    const TextName = element + 'Text';
    const ToggleName = element + 'Toggle';
    listCookie.push(
      <Container key={ContainerName} row>
        <Toggle key={ToggleName} checked={command[index].bool} onChange={command[index].toggle}/>
        <Text key={TextName} size={"normal"} weight={"regular"}>
        cookies {element}
        </Text>
      </Container>
    )
  })

  // verfication du de la presence du is submmited si c'est bon fait la popup sinon on ne montre rien 
  React.useEffect(() => {
    async function handleClick(){
      const exist =  await hasCookie('isSubmitted')
      return (exist)?setCookiescheck(false) : setCookiescheck(true);
    };
    handleClick()  
  }, [cookiescheck])

//a la fin de l'annnimation fait commun un formulaire une fois que l'annimation de drawer est fini j'envoie cette actions qui crée les cookies
const cookiesHandler = ()=>{
      for(let i =0;i<command.length;i++)
      {
        setCookie(cookieChoice[i],command[i].bool,{sameSite:"none",secure:true});
      }
  }

// je gere le submit dans un premier temps cela va fermer le drawer 
const handleSubmit = () =>{
  setCookie('isSubmitted',true,{sameSite:"none",secure:true})
  setActive(!active)
} 
      
      if(cookiescheck == true)
      {
        return (
          <Container>
              <Drawer show={!active} 
              onAnimationDone={cookiesHandler}
              onDismiss={() => setActive(false)}
              height={300}
              >
                <Container align="center" gap={10} style={{ padding: 10 }}>
                  <Text size={"title"} weight={"bold"}>
                    Cookies
                  </Text>
                  <Container gap={10} style={ {padding:20} }>
                    {listCookie}
                  </Container>
                </Container>
                <Container >
                  <Button type={"primary"} onClick={handleSubmit}>Enregisté les préferences</Button>
                </Container>
              </Drawer>
          </Container>
        );
      }
      }

