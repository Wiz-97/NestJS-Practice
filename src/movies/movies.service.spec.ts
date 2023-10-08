import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      // getAll 함수가 array(배열)을 return 해주는지 테스트
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne", () => {
    it("should return a movie", () => {
     service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      //movie가 정의되었고, id가 1이어야 한다는 조건
    });
    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 Not Found');
      }
    })
  });

describe("deleteOne", () => {
  it("deletes a movie", () => {
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
    const beforeDelete = service.getAll().length; // 모든 영화 목록
    service.deleteOne(1); // id가 1인 영화 삭제
    const afterDelete = service.getAll().length; // 삭제 후의 모든 영화 목록
    // 번거롭지만 최대한 정확한 확인을 위해 임시로 위와 같이 함
    expect(afterDelete).toBeLessThan(beforeDelete);//배열의 길이 비교를 통해 제대로 삭제되었는지 체크
  });
  it("should return a 404", () => {
    try {
      service.deleteOne(999);
    }catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
    }
  })
});
describe("create", () => {
  it("should create a movie", () => {
    const beforeCreate = service.getAll().length;
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
    const afterCreate = service.getAll().length;
    expect(afterCreate).toBeGreaterThan(beforeCreate);
  });
});
describe("update", () => {
  it("should update a movie", () => {
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
    service.update(1, {title: 'Updated Test'});
    const movie = service.getOne(1);
    expect(movie.title).toEqual('Updated Test');
  });
  it('should throw a NotFoundException', () => {
    try {
      service.update(999, {});
    } catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
    }
  })
}); 
});
