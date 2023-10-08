import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number): Movie {
        const movie = this.movies.find(movie => movie.id === id);//entity에서 id의 형식을 number로 설정했으므로 parseInt로 숫자로 변환해준다. parseInt 대신 +id라고 해도 된다.
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} Not Found`);
        }
        return movie;
    }

    deleteOne(id:number){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);//원래 있던 data 삭제
        this.movies.push({...movie, ...updateData});//다시 movie data 생성
    }

    search() {}
}
