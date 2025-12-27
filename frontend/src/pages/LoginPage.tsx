import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/useLogin'
import { Label } from '@radix-ui/react-label'
import { IconEye, IconEyeClosed, IconLoader2 } from '@tabler/icons-react'
import { type FormEvent, useState } from 'react'

const LoginPage = () => {
  const { login } = useLogin()
  const { mutateAsync, error, isError, isPending } = login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync({ username, password })
  }

  return (
    <div className="flex min-h-screen w-screen  bg-background overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="space-y-3">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Iniciar sesión</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder al panel de administración
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Nombre de usuario</Label>
                  <Input
                    id="email"
                    placeholder="Usuario"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <IconEyeClosed className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <IconEye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full flex gap-x-2" type="submit">
                {isPending && <IconLoader2 className="animate-spin" />}
                Iniciar sesión
              </Button>
            </CardFooter>
          </Card>

          {isError && (
            <p className="text-sm text-destructive text-center">
              {error.message}
            </p>
          )}
        </form>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted">
        <img
          src="/login-image.svg"
          alt="Financial Planning and Budgeting"
          width={600}
          height={600}
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage
