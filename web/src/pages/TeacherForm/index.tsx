import React,{ useState, FormEvent } from 'react';
import { useHistory} from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg'

import './style.css'

function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleitems] =  useState([
        {week_day: 0,from: '',to: ''}
    ]);

    function addNewScheduleItem(){
       setScheduleitems([
           ...scheduleItems,
          {week_day: 0,from: '',to: ''}
       ]);
    }

    function setScheduleitemValue(position: number, field: string, value:string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) =>{
            if(index === position){
                return {...scheduleItem,[field]: value}
            }

            return scheduleItem;
        })

        setScheduleitems(updateScheduleItems)
    }

    function handleCreateClass( e: FormEvent) {
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems

        }).then(() =>{
            alert('Cadastro realizado com sucesso!');

            history.push('/')
        }).catch(()=> {
            alert('Erro no cadastro!');
        })
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
    }

    return(
        <div id="page-teacher-form" className="container">
           <PageHeader 
           title='Que bom que você quer dar aula'
           description= 'o primeiro passo é preencher o formulario de inscrição'
           />
           <main>
                <form onSubmit = {handleCreateClass} >
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name='name'
                            label='Nome completo'
                            value={name}
                            onChange={(e) => {setName(e.target.value) }}
                            />
                        <Input
                            name='Avatar'
                            label='Avatar'
                            value={avatar}
                            onChange={(e) => {setAvatar(e.target.value) }}
                            />
                        <Input
                            name='whatsapp'
                            label='Whatsapp'
                            value={whatsapp}
                            onChange={(e) => {setWhatsapp(e.target.value) }}
                            />
                        <Textarea
                            name ='bio'
                            label='biografia'
                            value={bio}
                            onChange={(e) => {setBio(e.target.value) }}
                            />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name='subject'
                            label='Matéria completo'
                            value= {subject}
                            onChange = {(e) => {setSubject(e.target.value)}}
                            options = {[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação fisica', label: 'Educação fisica'},
                                {value: 'Física', label: 'Física'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'História', label: 'História'},
                                {value: 'Matemática', label: 'Matemática'},
                                {value: 'Portugês', label: 'Portugês'},
                                {value: 'Quimica', label: 'Quimica'},
                            ]}
                            />

                        <Input
                            name='const'
                            label='custo da sua hora por aula'
                            value= {cost}
                            onChange = {(e) => {setCost(e.target.value)}}/>
                    </fieldset>
                        
                        <fieldset>
                            <legend>Horários disponíveis
                            <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                            </legend>
                            
                            {scheduleItems.map((scheduleItem,index) =>{
                                return(
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select 
                                        name='week_day'
                                        label='Matéria semana'
                                        value = {scheduleItem.week_day}
                                        onChange={e => setScheduleitemValue(index, 'week_day', e.target.value )}
                                        options = {[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda-feira'},
                                            {value: '2', label: 'Terça-feira'},
                                            {value: '3', label: 'Quarta-feira'},
                                            {value: '4', label: 'Quinta-feira'},
                                            {value: '5', label: 'Sexta-feira'},
                                            {value: '6', label: 'Sábado'},
                                        ]} />
                                    <Input 
                                     name="from"
                                     label="Das"
                                     type="time" 
                                     value = {scheduleItem.from}
                                     onChange={e => setScheduleitemValue(index, 'from', e.target.value )}
                                    />
                                    <Input 
                                     name="to"
                                     label="Até"
                                     type="time"
                                     value = {scheduleItem.to}
                                     onChange={e => setScheduleitemValue(index, 'to', e.target.value )}
                                    />
                                    </div>
                                );
                            })}
                        </fieldset>

                    <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso importante"/>
                                Importante! <br/>
                                preencha todos os dados
                            </p>
                            <button type='submit'>salvar cadastro</button>
                    </footer>
                </form>
           </main>
        </div>
    )
}

export default TeacherForm;