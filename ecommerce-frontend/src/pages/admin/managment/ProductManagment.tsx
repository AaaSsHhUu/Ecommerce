import { useState, ChangeEvent, FormEvent } from "react";
import { AdminSidebar } from "../../../components";
import TextField from '@mui/material/TextField';

const ProductManagment = () => {
  const initials = {
    name : "Nike Shoes",
    price : 2000,
    stock : 50,
    photo : "https://m.media-amazon.com/images/I/71jDjaFd2cL._AC_UL320_.jpg"
  }
  const [nameUpdate,setNameUpdate] = useState<string>(initials.name);
  const [priceUpdate,setPriceUpdate] = useState<number>(initials.price);
  const [stockUpdate,setStockUpdate] = useState<number>(initials.stock);
  const [photoUpdate,setPhotoUpdate]   = useState<string>("");

  const changeImageHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const file : File | undefined = e.target.files?.[0];
    console.log("file : ", file);
    
    const reader: FileReader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if(typeof reader.result === "string"){
                console.log("reader.result : ", reader.result);
                
                setPhotoUpdate(reader.result);
            }
        }
    }
  }  

  const submitHandler = (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  }

  return (
    <>
        <div className="admin-container">
            <AdminSidebar />

            <main className="product-managment">
                <article>
                    <div className="product-info">
                        {stockUpdate > 0 && <span className="stock">{stockUpdate} Available</span>}
                        <strong>ID - cjnsijdcniqjwned</strong>
                        <img src={initials.photo} alt="product" />
                        <p>{nameUpdate}</p>
                        {
                          stockUpdate > 0  ? <span className="green">Availbale</span> : <span className="red">Not Available</span>
                        }
                        <h3>${priceUpdate}</h3>
                    </div>
                    <form onSubmit={submitHandler}> 
                        {/* Name */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Name" 
                             variant="outlined"
                             value={nameUpdate}
                             sx={{width : "100%"}}
                             type="text"
                             onChange={(e) => setNameUpdate(e.target.value)}
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
                             value={priceUpdate}
                             onChange={(e) => setPriceUpdate(Number(e.target.value))}
                             required
                            />
                        </div>
                        {/* Stock */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Stock" 
                             variant="outlined"
                             sx={{width : "100%"}}
                             value={stockUpdate}
                             type="number"
                             onChange={(e) => setStockUpdate(Number(e.target.value))}
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
                        {
                          photoUpdate && <img src={photoUpdate} className="preview-image" alt="selected image" />
                        }
                        <button type="submit">Update</button>
                    </form>
                </article>
            </main>
        </div>
    </>
  )
}

export default ProductManagment
