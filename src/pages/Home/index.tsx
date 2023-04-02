import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './style'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CycleContext'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export const Home = () => {
  const { activeCycle, StopCurrentCycle, createNewCycle } =
    useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().nonempty('O nome do projeto é obrigatório'),
    minutesAmount: zod
      .number()
      .int()
      .min(1, 'O ciclo mínimo permitido é de 5 minutos')
      .max(60, 'O ciclo máximo permitido é de 60 minutos'),
  })

  type inferedFormType = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<inferedFormType>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount')

  const handleCreateNewCycle = (data: inferedFormType) => {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={StopCurrentCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
