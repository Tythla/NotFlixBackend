import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../core/db";
import { User } from "../entities/User";
import { Repository } from "typeorm";

const secretOrKey: string = process.env.JWT_SECRET || 'secret';

export const useJwtStrategy = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey,
        algorithms: ["HS256"],
        ignoreExpiration: false,
      },
      async (payload, done) => {
        try {
          const userRepository: Repository<User> =
            AppDataSource.getRepository(User);
          const user = await userRepository.findOne({
            where: { email: payload.email },
          });

          if (user) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
