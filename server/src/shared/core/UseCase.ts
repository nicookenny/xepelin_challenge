/** @format */

export interface UseCase<IInput, IResult> {
  execute(request?: IInput): Promise<IResult> | IResult
}
