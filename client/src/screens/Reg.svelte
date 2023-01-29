<script type="ts">
  import { storage } from '@/data/storage'
  import { api } from '@/data/api'

  import Select from '@/ui/Select.svelte'
  import AlignCenter from '@/ui/AlignCenter.svelte'
  import Control from '@/ui/Control.svelte'
  import Button from '@/ui/Button.svelte'

  export let onStart: () => void

  const data = {
    name: '',
    sex: '',
    age: '',
    mood: '',
  }

  const errors = {
    name: '',
    sex: '',
    age: '',
    mood: '',
  }

  const validateData = () => {
    let result = true

    if(!data.name) {
      errors.name = 'придумайте псевдоним'
      result = false
    }
    else {
      errors.name = ''
    }

    if(!data.sex) {
      errors.sex = 'укажите свой пол'
      result = false
    }
    else {
      errors.sex = ''
    }

    if(!data.age || !Number.isInteger(Number(data.age)) || Number(data.age) <= 0) {
      errors.age = 'укажите солько вам лет'
      result = false
    }
    else {
      errors.age = ''
    }

    if(!data.mood) {
      errors.mood = 'оцените ваше настроение'
      result = false
    }
    else {
      errors.mood = ''
    }

    return result
  }

  const startTraining = async () => {
    const isValid = validateData()

    if (!isValid) {
      return
    }

    const { variant } = await api.reg({
      name: data.name,
      sex: data.sex,
      age: Number(data.age),
      mood: Number(data.mood[0]),
    })

    storage.variant = variant
    storage.nikname = data.name

    onStart()
  }
</script>

<h1>Тест: "экспериментальное мышление"</h1>

<p>Спасибо, что согласились поучаствовать в эксперименте. Вам предстоит решать задачу, за которую будут начисляться игровые баллы. По окончании эксперимента вы сможете сравнить свой результат с результатами других участников эксперимента.</p>
<p>Приблизительное время прохождения: 4 мин.</p>

<AlignCenter>
  <Control label="псевдоним" error={errors.name}>
    <input bind:value={data.name}>
  </Control>

  <Control label="пол" required error={errors.sex}>
    <Select bind:value={data.sex} variants={['', 'м', 'ж']} />
  </Control>

  <Control label="возраст" required error={errors.age}>
    <input bind:value={data.age}>
  </Control>

  <Control label="настроение" required error={errors.mood}>
    <Select bind:value={data.mood} variants={['', '1 (ужасное)', '2', '3', '4', '5 (прекрасное)']} />
  </Control>

  <Button text="начать" color="success" onClick={startTraining} />
</AlignCenter>
