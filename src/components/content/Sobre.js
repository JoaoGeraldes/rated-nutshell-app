import React, {Component} from 'react';

class Sobre extends Component {
    render() {
        return (
            <div className="well well-sm">
                <h1>Nutshell</h1>
                <h3>Uma aplicação simplista e prática, desenvolvida com o propósito de enriquecer a transmissão de conhecimento, com um formato mais veloz, sintetizado e eficaz.</h3>

                <h2>"Aprendizagem e partilha de conhecimento"</h2>

                <p>Criada num contexto académico, esta aplicação encaminha-nos para vertentes de aprendizagem com uma linguagem limpa e sucinta, de tal modo, a criação de um <i>Nutshell</i> implica vários pontos-chave:</p>
                <p>
                    <ul>
                        <li>Possuir conhecimento de causa sobre o tema abordado;</li>
                        <li>Conseguir sintetizar a informação, facilitando a leitura dos utilizadores;</li>
                        <li>De tal modo, não sobrecarregar o leitor;</li>
                        <li>Long story short (pontos-chave da questão de modo a reduzir tamanho do post);</li>
                    </ul>
                </p>
                <p className="label label-warning">Sistema de rating incluído nas publicações inseridas na aplicação, para assim existir, um bom <i>focus</i> das melhores publicações.</p>
            </div>
        );
    }
}

export default Sobre;