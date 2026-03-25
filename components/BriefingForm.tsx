'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

const BriefingForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="nome">Nome</label>
                <input id="nome" {...register('nome', { required: true })} />
                {errors.nome && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" {...register('telefone', { required: true })} />
                {errors.telefone && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" {...register('email', { required: true })} />
                {errors.email && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="cidadeEstado">Cidade/Estado</label>
                <input id="cidadeEstado" {...register('cidadeEstado', { required: true })} />
                {errors.cidadeEstado && <span>This field is required</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BriefingForm;