import './main.scss'
import { setProfile } from './profile/profile.ts'
import { setRegister } from './Auth/register.ts';

const isUserActive:boolean = false;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="main">
   <section>
      <div id="main">

      </div>
   </section>
  </div>

`
if (isUserActive !== false){
  setProfile(document.querySelector<HTMLDivElement>('#main')!)
} else if(isUserActive === false){
  // setLogin(document.querySelector<HTMLDivElement>('#main')!)
  setRegister(document.querySelector<HTMLDivElement>('#main')!)
}

