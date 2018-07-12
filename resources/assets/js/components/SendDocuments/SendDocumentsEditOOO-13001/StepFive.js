import React, { Component } from 'react'
import  dragndrop from '../../drag-n-drop.js'
import { Link, withRouter } from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class StepFive extends Component {

    constructor(props) {
        super(props);

        this.getDocumentsList(window.order_id);

        this.state = {
            order_id: window.order_id,
            document_id: 0,
            docs: []
        }
    }

    sendDocument(e) {
        let formData = new FormData(),
            droppedFiles = e.dataTransfer.files;
        formData.append("doc", droppedFiles);
        formData.append("order_id", this.state.order_id);
        let docs = this.state.docs;
        axios.post('api/docs/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                docs.push({
                    id: this.state.document_id++,
                    thumb: response.data.thumb,
                    type: 0
                });
            });
        this.setState({docs: docs});
        e.preventDefault();
        e.stopPropagation();
    }

    removeDocument(document) {

    }

    getDocumentsList(order) {
        axios.get("api/docs/show-needed/" + order)
            .then(response => {
                this.setState({documentList: response.data})
            })
            .catch(error => {
                this.setState({err: true, messages: error.response.data.errors})
            })
    }

    render() {
        return (
            <div className="auth">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                >
                <h3 className="step-head">Отправка документов</h3>
                <div className="steps-container">
                    <div className="steps">
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Соглашение
                                <b>1 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Выбор типа регистрации
                                <b>2 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Заполнение информации
                                <b>3 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Подпись заявления
                                <b>4 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Загрузка документов
                                <b>5 шаг</b>
                            </p>
                        </div>
                        <div className="step">
                            <img src="images\steps.svg" />
                            <p>
                                Готово!
                                <b>6 шаг</b>
                            </p>
                        </div>
                    </div>
                    <div className="step-content">
                        <h4>Загрузка документов:</h4>
                        <p>
                            Загрузите пакет документов и перетащите каждый из них в соответствующую папку. После добавления всех документов будет доступен шаг 6.
                        </p>
                        <div className="content">
                            <div className="docs-list">
                                {this.state.docs.map(function (document, index) {
                                    return (
                                        <div>
                                            <img src={document.thumb} />
                                            <select>
                                                <option value="0">Выберите тип</option>
                                                <option value="1">Паспорт</option>
                                                <option value="2">СНИЛС</option>
                                            </select>
                                            <div className="close-icon" onClick={event => this.removeDocument(document)}></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <form method="post" onDrop={event => this.sendDocument(event)} onSubmit={this.sendDocument} action="" noValidate className="box">
                                <div className="box__input">
                                    <input type="file" name="files[]" id="file" className="box__file" data-multiple-caption="{count} files selected" multiple />
                                    <label htmlFor="file"><span className="box__dragndrop">Перенесите документы в эту область или нажмите кнопку ниже</span>.</label>
                                    <svg className="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/></svg>
                                    <button type="submit" className="box__button btn blue">Загрузить документы</button>
                                </div>
                            </form>

                        </div>
                        <div className="button-wrapper">
                            <Link to="/send/stepFour/editOOO-13001">
                                <button className="btn">
                                    Назад
                                </button>
                            </Link>
                            <Link to="/send/stepSix/editOOO-13001">
                                <button className="btn blue">
                                    Далее
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <script src="js/drag-n-drop.js"></script>
                {dragndrop( document, window, 0 )}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default withRouter(StepFive)