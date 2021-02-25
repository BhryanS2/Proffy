import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './style.css';



function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject ] = useState ('');
    const [week_day, setWeekDay ] = useState('');
    const [time, setTime ] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            }
        })

       setTeachers(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
           <PageHeader title ='Que incrível que você quer dar aula.'> 
                <form id='search-teachers' onSubmit={searchTeachers}>
                <Select 
                    name='subject'
                    label='Matéria completo'
                    value = {subject}
                    onChange = {(e) =>{ setSubject(e.target.value)}}
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
                    <Select 
                    name='week_day'
                    label='Matéria semana'
                    value = {week_day}
                    onChange = {(e) =>{ setWeekDay(e.target.value)}}
                    options = {[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-feira'},
                        {value: '2', label: 'Terça-feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sábado'}
                    ]} />
                
                    <Input 
                    name='time'
                    type='time'
                    label= 'Hora'
                    value = {time}
                    onChange = {(e) =>{ setTime(e.target.value)}}
                    />
                    <button type= 'submit'>
                        Buscar
                    </button>
                </form>
           </PageHeader>
           <main>
               {teachers.map((teacher:Teacher) => {
                   return<TeacherItem key={teacher.id} teacher={teacher} />;
               })}
           </main>
        </div>
    )
}

export default TeacherList;
