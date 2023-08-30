import React from "react"
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function App() {
  
    const [dice, setDice] = React.useState(allNewDice())
    const [Tenzeis,setTenzeis] =React.useState(false)

    React.useEffect(()=>{
       var ten =true
       var val=dice[0].value
       dice.forEach(die =>{
        if(die.isHeld!==true || die.value!==val)
        {
            ten=false
        }
       })
      setTenzeis(ten)
      ten && console.log("Congrats YOW WON !!!")
    },[dice])

    // or
    // React.useEffect(() => {
    //     const allHeld = dice.every(die => die.isHeld)
    //     const firstValue = dice[0].value
    //     const allSameValue = dice.every(die => die.value === firstValue)
    //     if (allHeld && allSameValue) {
    //         setTenzies(true)
    //         console.log("You won!")
    //     }
    // }, [dice])

    function generateDice()
    {
        return{
            value: Math.ceil(Math.random() * 6),
                isHeld : false,
                id : nanoid()
        }
    }

    function allNewDice()
    {
        const dices = []
        for(var i=0;i<10;i++)
        {
            dices.push(generateDice())
        }
        return dices
    }


    function roll()
    {
        console.log(Tenzeis)
       Tenzeis? setDice(allNewDice()) :setDice(myDice => myDice.map(die =>{
       return die.isHeld? die:generateDice()
       }))
    }

    // or 
    // function roll()
    // {
    //    setDice(myDice => myDice.map(die =>{
    //    if(die.isHeld)
    //    return die
    // else return generateDice()
    //    }))
    // }


    const Dices = dice.map(die =>(
        <Die key={die.id} value={die.value} fixed={die.isHeld} hold={()=>hold(die.id)} />
        ))

        function hold(id)
        {
          const updatedDice = dice.map(die => {
            if(die.id===id)
            {
                return {...die,isHeld:!die.isHeld}
            }
           return{...die}
          })
    //   console.log(updatedDice)
          setDice(updatedDice)
        }
        const btn = Tenzeis?"New Game":"Roll"
    return (
            <main>
                <p className="title">Tenzies</p>
                <p className="text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <section>
               {Dices}
            </section>
            <input type="button" value={btn} className="btn" onClick={roll}/>
           {Tenzeis && <Confetti
                            drawShape={ctx => {
                              ctx.beginPath()
                              for(let i = 0; i < 22; i++) {
                                const angle = 0.35 * i
                                const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                                const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                                ctx.lineTo(x, y)
                              }
                              ctx.stroke()
                              ctx.closePath()
                            }}
                          />}
            </main>
    )
}