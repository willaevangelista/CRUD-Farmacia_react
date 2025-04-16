import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Categorias from "../../../models/Categoria";
import CardCategorias from "../cardcategoria/CardCategorias"
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";


function ListaCategorias() {

    const navigate = useNavigate();
    
    const [categorias, setCategorias] = useState<Categorias[]>([])

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {});
        } catch (error: any) {
            ToastAlerta("Erro ao buscar categorias", "erro")
        }
    }
    

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    return (
        <>
        {categorias.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
        />
        )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                       {categorias.map((categoria) => (
                            <CardCategorias key={categoria.id} categoria={categoria} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaCategorias;