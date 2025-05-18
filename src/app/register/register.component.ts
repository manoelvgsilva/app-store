import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  btnCadaster = true;
  cities: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      typePerson: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNasc: ['', Validators.required],
      sex: ['', Validators.required],
      password: ['', Validators.required],
      controlPassword: ['', Validators.required],
      phone: ['', Validators.required],
      identity: ['', Validators.required],
      cep: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      bairro: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      reference: [''],
      receiveNewslatter: [false]
    });

    this.form.get('state')?.valueChanges.subscribe((state) => {
      if (state) {
        this.getCitiesByState(state);
      } else {
        this.cities = [];
      }
    });

    this.form.get('cep')?.valueChanges.subscribe((cep) => {
      if (cep && cep.length === 8) {
        this.getAddressByCep(cep);
      }
    });
  }

  getAddressByCep(cep: string) {
    this.userService.getAddressByCode(cep).subscribe({
      next: (address) => {
        this.form.patchValue({
          address: address.publicLoc,
          complement: address.complement,
          bairro: address.neighborhood,
          state: address.fu,
          number: '',
          city: address.location
        });
        this.getCitiesByState(address.fu);
      },
      error: (err) => {
        console.error('Erro ao buscar endereço pelo CEP:', err);
      }
    });
  }

  getCitiesByState(state: string) {
    this.userService.getCitiesByState(state).subscribe({
      next: (cities) => {
        this.cities = cities;
        this.form.get('city')?.setValue('');
      },
      error: (err) => {
        console.error('Erro ao buscar cidades:', err);
        this.cities = [];
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (formValue.password !== formValue.controlPassword) {
        console.error('As senhas não coincidem');
        return;
      }

      const payload = {
        username: formValue.name,
        dataNasc: formValue.dataNasc,
        cpf: formValue.cpf,
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone,
        role: 'USER'
      };

      this.userService.createUser(payload).subscribe({
        next: (res) => {
          console.log('Perfil criado com sucesso:', res);
          this.userService.upUser(payload).subscribe({
            next: (res) => {
              console.log('Usuário atualizado:', res);
              this.form.reset();
            },
            error: (err) => {
              console.error('Erro ao atualizar usuário:', err);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao criar usuário:', err);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
