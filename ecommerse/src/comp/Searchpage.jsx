import React, { useEffect, useRef, useState } from 'react'
import '../css/search.css'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Pagewrapper from './Pagewrapper';
import Footer from './Footer';

const Searchpage = () => {
    const [product, setproduct] = useState([]);
    const [text, settext] = useState("");
    const [suggesion, setsuggesion] = useState([]);
    let [value,setvalue]=useState(0);
    const [search, setsearch] = useState(false);
    const loadref=useRef(0);

    const nav = useNavigate();

    function navi(click) {
        nav(click)

    }

    useEffect(() => {
        const data2 = async () => {
            try {
                const data = await fetch(`https://dummyjson.com/products`)
                const result = await data.json();
                setproduct(result.products);
            }
            catch (error) {
                console.log("not fetched", error)
            }
        }
        data2();
    }, []);

    //search
    const handeldata = (e) => {
        const value = e.target.value;
        settext(value);

        if (!value.trim()) {
            setsuggesion([]);
            return;
        }

        const filtered =
            product.filter(item =>
                item.title.toLowerCase().startsWith(value.toLowerCase())
            );

        setsuggesion(filtered);
    }

    const handel=()=>{
        loadref.current+=1;
           if(loadref.current!==suggesion.length){
             setsearch(false); 
           }
            if(suggesion.length===0){
            loadref.current=0
        }
         if(loadref.current>suggesion.length){
            loadref.current=suggesion.length
        }
             if(loadref.current===suggesion.length ){
            setsearch(true);
         }
          console.log(value);
        console.log(search);
        console.log("loadref "+loadref.current)
    }

   
    return (
        
            <div>
                <div className='search-container' >
                    <Pagewrapper>
                    <input placeholder='search products...' onChange={handeldata} value={text} />
                    {text.length>0 && (
                        <p>search"{text}"</p>
                    )}
                    </Pagewrapper>
                    <div className='sugg-box'>
                        <ul>
                            {suggesion.map(p => (
                                <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={search ? { opacity: 1, scale: 1 } : {}}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                <li onClick={() => navi(`/product/${p.id}`,
                                    setsearch(false)
                                )}>
                                    <span>
                                        
                                            <img src={p.images[0]} alt=""   onClick={() => navi(`/product/${p.id}`,
                                                setsearch(false)
                                            )} onLoad={handel}  />
                                        

                                    </span> <div className='list-title'>
                                        <span className='list-title-1'>{text} <span className='list-title-2'>{p.title.substring(text.length)}</span></span> 
                                    </div>
                                </li>
                                </motion.div>
                            ))}
                        </ul>
                    </div>
                </div>
                <Footer/>
            </div>
      

    )
}

export default Searchpage
