import React,{Component} from 'react'

class RoleManager extends Component{

    something2 = ()=>{
        console.log('2222')
        return new Promise((resolve,reject) =>{
            for(let i=0;i<3;i++){
                setTimeout(()=>{
                    console.log(i)
                    resolve(i)
                },1000)
                
                
            }
        })
    }


    something = ()=>{
        let arr:Array<any> = []
        return new Promise((resolve,reject) =>{
            for(let i=0;i<3;i++){
                
                arr.push(this.something2())
                
            }

            Promise.all(arr).then((result) => {
                console.log(result) 
                resolve('111')            
            }).catch((error) => {
                console.log(error)
            })
        })


    }



    some=()=>{
        let obj = [
            {a:1},
            {a:2}
        ]

        obj.map((item,index)=>{
            item['uu']=index
        })

        console.log(obj)
    }


    componentDidMount(){
        console.log('222222222222')
        this.some()
    }
    render(){
        return (
            <>
                <h1>RoleManager</h1>
            </>
        )
    }
}


export default RoleManager