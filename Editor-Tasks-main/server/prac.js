const getCream = ()=>{
    return new Promise((resolve, reject)=>{
        const cream = "no"
        setTimeout(()=>{
            if(cream === 'yes') resolve("🍨")
            else reject('cream not available')
        }, 2000)
    })
}

const getSprinkles = ()=>{
    return new Promise((resolve, reject)=>{
        const sprinkles = "yes"
        setTimeout(()=>{
            if(sprinkles === 'yes') resolve("🎉")
            else reject('sprinkles not available')
        },2000)
    })
}

const makeDonut = (cream, sprinkles)=>{
    return new Promise((resolve)=>{
        resolve(cream + sprinkles + '🍩')
    })
}

Promise.any([getCream(), getSprinkles()])
.then((val)=>{
    return makeDonut(val[0], val[1])
})
.then((donut)=>console.log(donut))
.catch((err)=> console.log(err))