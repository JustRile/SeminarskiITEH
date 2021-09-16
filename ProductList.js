import Header from './Header'
import React,{useState,useEffect} from 'react'
import{Table} from 'react-bootstrap'
import{Link} from 'react-router-dom'

function ProductList(){

    const [data,setData]=useState([]);
    useEffect(async()=>{
        
        getData();
    },[])
    console.warn("result",data)
    async function deleteOperation(id){
        let result=await fetch("http://localhost:8000/api/delete/"+id,{
            method:'DELETE'
        });
        result=await result.json();
        console.warn(result)
        getData();
    
    }
    async function getData(){
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result)
    }
    return(
        <div class="Proizvodi">
            <Header/>
            <h1>Product List</h1>
            <div className="col-sm-6 offset-sm-3">
            <Table striped bordered hover>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Opcija</td>
                </tr>
                {
                    data.map((item)=> <tr>
                    <td>{item.id}</td>
                    
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td><img style = {{ width:100 }} src={"http://localhost:8000/"+item.file_path}/></td>
                    <td >
                        <span onClick={()=>deleteOperation(item.id)} class="delete btn btn-outline-danger" >Delete</span>
                    </td>
                    <td >
                    <Link to={"update/"+item.id}>
                        <span  class="update btn btn-outline-danger" >Update</span>
                         </Link>
                        </td>
                        
                </tr>
                )
                }
        
            </Table>
            </div>
        </div>
    )
}

export default ProductList;