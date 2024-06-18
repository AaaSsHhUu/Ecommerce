import { useState, ChangeEvent } from "react";
import { AdminSidebar } from "../../../components";
import TextField from '@mui/material/TextField';

const ProductManagment = () => {
  const img = "https://m.media-amazon.com/images/I/71jDjaFd2cL._AC_UL320_.jpg"
  const [name,setName] = useState<string>("Nike Shoes");
  const [price,setPrice] = useState<number>(2000);
  const [stock,setStock] = useState<number>(1);
  const [photo,setPhoto]   = useState<string>(img);

  const changeImageHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const file : File | undefined = e.target.files?.[0];
    console.log("file : ", file);
    
    const reader: FileReader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if(typeof reader.result === "string"){
                console.log("reader.result : ", reader.result);
                
                setPhoto(reader.result);
            }
        }
    }
  }  
  return (
    <>
        <div className="admin-container">
            <AdminSidebar />

            <main className="product-managment">
                <article>
                    <div className="product-info">
                        {stock > 0 && <span className="stock">{stock} Available</span>}
                        <strong>ID - cjnsijdcniqjwned</strong>
                        <img src={photo} alt="product" />
                        <p>{name}</p>
                        {
                          stock > 0  ? <span className="green">Availbale</span> : <span className="red">Not Available</span>
                        }
                        <h3>${price}</h3>
                    </div>
                    <form>
                        {/* Name */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Name" 
                             variant="outlined"
                             value={name}
                             sx={{width : "100%"}}
                             type="text"
                             onChange={(e) => setName(e.target.value)}
                             required
                            />
                        </div>
                        {/* Price */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Price" 
                             variant="outlined"
                             sx={{width : "100%"}}
                             type="number"
                             value={price}
                             onChange={(e) => setPrice(Number(e.target.value))}
                             required
                            />
                        </div>
                        {/* Stock */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Stock" 
                             variant="outlined"
                             sx={{width : "100%"}}
                             value={stock}
                             type="number"
                             onChange={(e) => setStock(Number(e.target.value))}
                             required
                            />
                        </div>
                        {/* Photo */}
                        <div>
                            <label>Photo</label>
                            <TextField id="outlined-basic"
                             type="file"
                             sx={{width : "100%"}}
                             variant="outlined"
                             onChange={changeImageHandler}
                             required
                            />
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </article>
            </main>
        </div>
    </>
  )
}

export default ProductManagment
