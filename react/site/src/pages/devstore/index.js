
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'

import { useState, useEffect, React, useRef } from 'react'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import Api from '../../service/api.js'
const api = new Api();


export default function Index() {

    const [produto, setProduto] = useState([]);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [precoDe, setPrecoDe] = useState('');
    const [precoPor, setPrecoPor] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idAlterando, setIdAlterando] = useState(0)
    const loading = useRef();

    async function listar () {
        loading.current.continuousStart();
        let r = await api.listar();
        setProduto(r);
        loading.current.complete();
    }

    useEffect (() => {
        listar();
    }, []);

    async function inserir () {
        loading.current.continuousStart();

        if(nome !== ('') && categoria !== ('') && avaliacao !== (isNaN) && avaliacao !==('') 
           && precoDe !== ('') && precoDe !== (isNaN) && precoPor !== ('') && precoPor !== (isNaN) 
           && estoque !== (isNaN) && imagem !== ('') && descricao !== ('')){
               if(idAlterando === 0) {
                    let r = await api.inserir(nome, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem);
                    if(r.erro)
                        toast.dark(r.erro)
                    else
                        toast.dark('Produto cadastrado com sucesso!')
               }
           } else {
            let r = await api.alterando( idAlterando, nome, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem);
            if (r.erro)
            toast.dark(r.erro)
            else
                toast.dark('Produto alterado com sucesso!')
           }
           listar();
           limparCampos();
    }
}


    function limparCampos () {
        setNome('')
        setCategoria('')
        setPrecoDe('')
        setPrecoPor('')
        setAvaliacao('')
        setDescricao('')
        setEstoque('')
        setImg('')
        setIdAlterando(0);
    }

    async function remover (id) {
        loading.current.continuousStart();

        confirmAlert({
            title: 'Remover Produto',
            message: `Tem certeza que deseja remover o produto ${id}?`,
            buttons: [
                {
                    label: 'Sim, remover',
                    onClick: async() => {
                        let r = await api.remover(id)
                        if(r.erro) {
                            toast.dark(r.erro)
                        } else {
                            toast.dark('Produto removido com sucesso!')
                        }
                        listar();
                    }
                },
                {
                    label: 'Não, Cancelar!'}
            ]
        })
        listar();

        loading.current.complete()
    }

    async function editar (item) {
        setNome(item.nm_produto);
        setCategoria(item.ds_categoria);
        setPrecoDe(item.vl_preco_de);
        setPrecoPor(item.vl_preco_por);
        setAvaliacao(item.vl_avaliacao);
        setDesc(item.ds_produto);
        setEstoque(item.qtd_estoque);
        setImg(item.img_produto);
        setIdAlterando(item.id_produto);
    }

    return (
        <Container>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">Novo Aluno</div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input /> </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input /> </div> 
                                </div>
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="corse-student"> Preço De: </div>  
                                    <div class="input"> <input /> </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Preço POR: </div>  
                                    <div class="input"> <input /> </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="class-student"> Estoque: </div>  
                                    <div class="input"> <input /> </div> 
                                </div>

                            </div>

                        </div>

                        <div class="input-new-student-2">
                        <div class="agp-input-2">
                                    <div class="number-student"> Link Imagem: </div>  
                                    <div class="input"> <input /> </div> 
                                </div>

                                <div class="agp-textarea">
                                    <div class="number-student"> Descrição: </div>  
                                    <div class="input"> <textarea></textarea> </div> 
                                </div>
                            
                        </div>
                        <div class="button-create"> <button> Cadastrar </button> </div>

                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Alunos Matriculados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td> 1 </td>
                                    <td> Esfera do Dragão</td>
                                    <td> Acessórios </td>
                                    <td> 15,99 </td>
                                    <td> 14 </td>
                                    <td> <button> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td> <button> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>
                            
                                <tr class="linha-alternada">
                                    <td></td>
                                    <td> 1 </td>
                                    <td> Esfera do Dragão</td>
                                    <td> Acessórios </td>
                                    <td> 15,99 </td>
                                    <td> 14 </td>
                                    <td> </td>
                                    <td> </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td> 1 </td>
                                    <td> Esfera do Dragão</td>
                                    <td> Acessórios </td>
                                    <td> 15,99 </td>
                                    <td> 14 </td>
                                    <td></td>
                                    <td></td>
                                </tr>

                                <tr class="linha-alternada">
                                    <td></td>
                                    <td> 1 </td>
                                    <td> Esfera do Dragão</td>
                                    <td> Acessórios </td>
                                    <td> 15,99 </td>
                                    <td> 14 </td>
                                </tr>
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
